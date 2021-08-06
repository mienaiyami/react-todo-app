const ListItem = (props) => {
    let checkBoxId = props.checkBoxId;
    let listItemText = props.listItemText;
    let isChecked = props.isChecked ? true : null;
    return props.type === "display" ? (
        <div key={checkBoxId} id="" className="listItem">
            <input
                type="checkbox"
                id={checkBoxId}
                checked={isChecked ? true : null}
                onChange={props.changeTaskType}
            />
            <label htmlFor={checkBoxId}></label>
            <div
                className="listItemText"
                onClick={(e) => e.target.parentElement.children[0].click()}
            >
                {listItemText}
            </div>
            <button
                className="dltTask"
                onClick={() => props.dltTask(checkBoxId)}
            ></button>
        </div>
    ) : (
        <div key={checkBoxId} id="" className="listItem">
            <input type="checkbox" name="" id={checkBoxId} disabled />
            <label htmlFor={checkBoxId}></label>
            <div className="listItemText">
                <input
                    type="text"
                    placeholder={listItemText}
                    onKeyUp={(e) => props.handleNewData(e, checkBoxId)}
                    onBlur={(e) => props.handleNewData(e, checkBoxId)}
                />
            </div>
        </div>
    );
};

export default ListItem;
