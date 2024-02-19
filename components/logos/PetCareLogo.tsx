import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

export const PetCareLogo = (props: any) => {
    return (
        <Svg
            viewBox="0 0 24 24"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000"
            {...props}
        >
            <Path
                d="M19.5 22H14a1 1 0 01-1-1v-1a1 1 0 011-1h5.5a1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5z"
                fill="#496791"
            />
            <Path d="M11 10h6v12H8a4 4 0 01-4-4v-1a7 7 0 017-7z" fill="#496791" />
            <Path
                d="M12 22a1 1 0 01-1-1v-1h2v1a1 1 0 01-1 1zM16 22a1 1 0 01-1-1v-1h2v1a1 1 0 01-1 1zM14 14a3 3 0 01-3-3V9h6v2a3 3 0 01-3 3z"
                fill="#fff"
            />
            <Path
                d="M13 4l-3 2V2.207a.5.5 0 01.854-.353zM15 4l3 2V2.207a.5.5 0 00-.854-.353z"
                fill="#adcce5"
            />
            <Path d="M14 11a4 4 0 01-4-4V4h8v3a4 4 0 01-4 4z" fill="#496791" />
            <Circle cx={12.25} cy={6.75} r={0.75} fill="#fff" />
            <Circle cx={16} cy={6.75} r={0.75} fill="#fff" />
        </Svg>
    )
}
