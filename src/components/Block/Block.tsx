import React, { useState, useEffect } from "react";

const Block = (props: any) => {

    const capitalizeFirst = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
    }

    return (
        <>
            {props.filteredBlocks
                .map((item: any, index: number) => {
                    return (
                        <div className="stack-sm max-width" key={index}>
                            <h2>{item.title}</h2>
                            <div className="flex-fifty-fifty">
                                <div>
                                    <p><strong>Type:</strong> {capitalizeFirst(item.type)}</p>
                                    <p><strong>Level:</strong> {capitalizeFirst(item.level)}</p>
                                    <p><strong>Focus:</strong> {capitalizeFirst(item.focus)}</p>
                                </div>
                                <div>
                                    <p><strong>Equipment:</strong> {capitalizeFirst(item.equipment)}</p>
                                    <p><strong>Props:</strong> {item.props?.length > 0 ?
                                        item.props.map((prop: any, index: number) => {
                                            return (
                                                <span className="block-props" key={index}>
                                                    {capitalizeFirst(prop)}
                                                </span>
                                            )
                                        }) : <span>None</span>
                                    }
                                    </p>
                                </div>
                            </div>
                            <p><strong>Start position:</strong> {item.start}</p>
                            <p><strong>Instructions:</strong></p>
                            <ul>
                                {item.instructions.map((instruction: any, index: number) => {
                                    return (
                                        <li key={index}>
                                            {instruction.step}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Block;