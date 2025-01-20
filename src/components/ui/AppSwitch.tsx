import { Switch } from 'antd'
import React, { useState } from 'react'

type Props = {
    onChange: (checked: boolean) => void
    checked: boolean,
    defaultChecked?: boolean
}

const AppSwitch = (props: Props) => {
    const [checked, setChecked] = useState(props.checked)
  return (
    <Switch
    checked={checked}
    defaultChecked={props.defaultChecked}
    onChange={(checked)=>{
        setChecked(checked)
        props.onChange(checked)
    }}
    />
  )
}

export default AppSwitch