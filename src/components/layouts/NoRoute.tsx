import { Link } from "react-router-dom"

export const NoRoute = () => {
  return (
    <div className="error-message">
      <h3 className="error-message__title">ERROR</h3>
      <p>Route not found</p>
      <Link className="btn btn--home" to="/">Вернуться на главную</Link>
    </div>
  )
}