import "./Spinner.css"

export default function Spinner({ item = "data" }) {
  return (
    <div className="status-view">
      <div className="spinner" />
      <h2>Loading {item}...</h2>
    </div>
  )
} 