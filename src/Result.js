export const Result = ({ result, onRescan }) => {
  return (
    <div>
      {result.toString()}
      <button onClick={onRescan}>สแกนใหม่</button>
    </div>
  )
}
