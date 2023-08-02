import "./single.scss";

const Result = ({res}) => {
  return (
    <div className="home">
      <textarea value={res} className='res'>
  Hello there, this is some text in a text area
</textarea>
      </div>
  )
}

export default Result