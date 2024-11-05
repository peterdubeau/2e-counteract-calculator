/* eslint-disable react/prop-types */
export default function SuccessMessage ({text, color}) {
  return(
    <div className="flex justify-center flex-col items-center">
      <p>Minimum Success required:</p>
      <p style={{"color": color}}>{text}</p>
    </div>
  )
}