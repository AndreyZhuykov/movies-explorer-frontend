import React from "react";

function FilterCheckbox(props){

    return (
            <div className="filter-checkbox">
                <input 
                    className='filter-checkbox__input' 
                    type='checkbox'
                    checked={props.short}
                    onChange={() => props.updateShort(!props.short)}
                />
                <label className='filter-checkbox__label' >Короткометражки</label>
            </div>
    )
}

export default FilterCheckbox