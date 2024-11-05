/* eslint-disable react/prop-types */

function Form({label, value, setValue, options}) {

  function parseValue(val) {
    if (val === "" || val === 0) {
      return setValue(0)
    }
    return setValue(parseInt(val))
  }
  
  return (
    <div className="inline-grid grid-cols-3 gap-4">
      <div>
        <p>{label}</p>
        <input
          value={value}
          onChange={(e) => parseValue(e.target.value)}
        />
        {options?.levelOrRank ? 
          <input 
            type="radio"
          />
          :
          ""
        }
        
      </div>
    </div>
  );
}


export default Form