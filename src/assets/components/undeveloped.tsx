import React from "react";
import {Empty} from "antd";

const Undeveloped: React.FC = () => {
    return (
        <>
            <div style={{display: "flex", justifyContent: "center", marginTop: 200}}>
                <Empty description="页面暂无内容"/>
            </div>
        </>
    )
}
export  default Undeveloped