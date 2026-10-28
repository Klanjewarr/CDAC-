export function TextAreaField({pHolder,
                        stateFunction,
                        stateVar,
                        refVar})
{
    return(<textarea className="form-control form-control-sm"
                      ref={refVar}
                      defaultValue={stateVar}
                        onChange={function (event) {
                        stateFunction(event.target.value);
                        }}
                        placeholder={pHolder}
                        
                    ></textarea>)
}

export function TextField({pHolder,
                        stateFunction,
                        stateVar,
                        refVar}){
    return(<>
            <input className="form-control form-control-sm"
                        value={stateVar}
                        ref={refVar}
                        onChange={function (event) {
                        stateFunction(event.target.value);
                        }}
                        placeholder={pHolder}
                        
                    />
    </>)
}
export function IntTextField({pHolder,
                        stateFunction,
                        stateVar,
                        refVar}){
    return(<>
            <input className="form-control form-control-sm"
                        value={stateVar}
                        ref={refVar}
                        onChange={function (event) {
                        stateFunction(parseInt(event.target.value));
                        }}
                        placeholder={pHolder}
                        
                    />
    </>)
}


export function SelectField({
            stateFunction,
            statevar,
            selectId,
            optionData})
{
    return(    <select
            id={selectId}
            className="form-select form-select-sm"
            value={statevar}
            onChange={function (event) {
              stateFunction(event.target.value);
              }}
          >
            {
                optionData.map((e)=><option value={e.value}>
                                    {e.text}
                                    </option>)
            }
          </select>)
}


export function ButtonField({isDisable,text,color})
{
    return(
        <button disabled={isDisable}  className={`btn btn-${color}`}>{text}</button>
    )
}

export function ButtonFieldReducer({isDisable,text,color,eventFunction})
{
    return(
        <button disabled={isDisable}  onClick={()=>eventFunction} className={`btn btn-${color} m-2 p-2 `}>{text}</button>
    )
}