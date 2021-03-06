import { Select as Selector, InputLabel, FormControl } from "@mui/material"

const Select = ({title, width, value, handler, items, error}) => {
    return (
        <FormControl style={{margin:"0.5rem"}} error={error}>
            <InputLabel >{title}</InputLabel>
            <Selector
                style={{ width: width }}
                value={value}
                label={title}
                onChange={handler}
            >
                {items}
            </Selector>
        </FormControl>
    )
}

export default Select
