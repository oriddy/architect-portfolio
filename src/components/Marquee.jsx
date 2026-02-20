const words = ['Architecture','Interior Design','Urban Planning','Residential','Commercial','Cultural','Consulting','Sustainable Design']
const items = [...words, ...words]

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((w, i) => (
          <span key={i} className="marquee__item">{w}<span /></span>
        ))}
      </div>
    </div>
  )
}
