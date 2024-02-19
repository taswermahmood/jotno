import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const FacebookLogo = (props: any) => {
    return (
        <Svg
            width={48}
            height={48}
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M26.922 16.522h3.093v-4.569H26.38v.017c-4.405.156-5.308 2.632-5.388 5.233h-.009v2.282h-3v4.474h3v11.994h4.521V23.959h3.704l.715-4.474h-4.417v-1.379c0-.879.585-1.584 1.417-1.584Z"
                fill="#fff"
            />
        </Svg>
    )
}
