import { useLayoutEffect, useRef, useState } from 'react'

/**
 * Renders a fixed-size (px) design and scales it to fill the parent width,
 * so an absolutely-positioned frame stays pixel-faithful while remaining fluid.
 * Fills the container width (so a mx-auto wrapper keeps it centered); bound the
 * upscale with a max-w-* wrapper.
 */
export default function ScaledCanvas({ width, height, children, className = '' }) {
  const ref = useRef(null)
  const [scale, setScale] = useState(0)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setScale(el.offsetWidth / width)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])

  return (
    <div
      ref={ref}
      className={className}
      style={{ height: scale ? height * scale : undefined, overflow: 'hidden' }}
    >
      <div
        style={{
          width,
          height,
          transform: `scale(${scale || 1})`,
          transformOrigin: 'top left',
          position: 'relative',
          visibility: scale ? 'visible' : 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  )
}
