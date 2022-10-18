import React, { useState, useEffect } from "react";

const WorkoutBlock = (props: any) => {

    const capitalizeFirst = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
    }

    return (
        <>
            <h2>{props.block.title}</h2>
            <div className="flex-fifty-fifty">
                <div>
                    <p><strong>Type:</strong> {capitalizeFirst(props.block.type)}</p>
                    <p><strong>Level:</strong> {capitalizeFirst(props.block.level)}</p>
                    <p><strong>Focus:</strong> {capitalizeFirst(props.block.focus)}</p>
                </div>
                <div>
                    <p><strong>Equipment:</strong> {capitalizeFirst(props.block.equipment)}</p>
                    <p><strong>Props:</strong> {props.block.props?.length > 0 ?
                        props.block.props.map((prop: any, index: number) => {
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
            <p><strong>Start position:</strong> {props.block.start}</p>
            <p><strong>Instructions:</strong></p>
            <ul>
                {props.block.instructions.map((instruction: any, index: number) => {
                    return (
                        <li key={index}>
                            {instruction.step}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default WorkoutBlock;