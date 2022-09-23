import React, { useState, useEffect } from "react";
import { database } from '../../services/firebase';
import { useForm } from 'react-hook-form';

const BlockFilters = (props: any) => {
    const [typesList, setTypesList] = useState<{ item: string }[]>([]);
    const [levelList, setLevelList] = useState<{ item: string }[]>([]);
    const [focusList, setFocusList] = useState<{ item: string }[]>([]);
    const [equipmentList, setEquipmentList] = useState<{ item: string }[]>([]);
    const [propsList, setPropsList] = useState<{ item: string }[]>([]);

    const capitalizeFirst = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
    }

    type FilterValues = {
        types: string[],
        focus: string[],
        levels: string[],
        equipment: string[],
        props: string[];
    };
    
    useEffect(() => {
        database.ref('types').child('list').on('value', function (snapshot) {
            setTypesList(snapshot.val());
        });
        database.ref('levels').child('list').on('value', function (snapshot) {
            setLevelList(snapshot.val());
        });
        database.ref('focus').child('list').on('value', function (snapshot) {
            setFocusList(snapshot.val());
        });
        database.ref('equipment').child('list').on('value', function (snapshot) {
            setEquipmentList(snapshot.val());
        });
        database.ref('props').child('list').on('value', function (snapshot) {
            setPropsList(snapshot.val());
        });
    }, []);

    const { register, handleSubmit } = useForm<FilterValues>();

    const onSubmit = handleSubmit(data => {
        props.updateFilters([data]);
        props.updateTypesFilters([data.types]);
        props.updateFocusFilters([data.focus]);
        props.updateLevelsFilters([data.levels]);
        props.updateEquipmentFilters([data.equipment]);
        props.updatePropsFilters([data.props]);
    });

    return (
        <>
            <h2>Filters</h2>
            <form onSubmit={onSubmit} className="stack-lg">
                <fieldset className="stack-sm">
                    <legend>Types</legend>
                    {typesList.length > 0 &&
                        typesList.map((item, index) => {
                            return (
                                <div key={index}>
                                    <input type="checkbox" id={item.item} value={item.item} {...register("types")} name="types" />
                                    <label htmlFor={item.item}>{capitalizeFirst(item.item)}</label>
                                </div>
                            )
                        })
                    }
                </fieldset>

                <fieldset className="stack-sm">
                    <legend>Levels</legend>
                    {levelList.length > 0 &&
                        levelList.map((item, index) => {
                            return (
                                <div key={index}>
                                    <input type="checkbox" id={item.item} value={item.item} {...register("levels")} name="levels" />
                                    <label htmlFor={item.item}>{capitalizeFirst(item.item)}</label>
                                </div>
                            )
                        })
                    }
                </fieldset>

                <fieldset className="stack-sm">
                    <legend>Focus</legend>
                    {focusList.length > 0 &&
                        focusList.map((item, index) => {
                            return (
                                <div key={index}>
                                    <input type="checkbox" id={item.item} value={item.item} {...register("focus")} name="focus" />
                                    <label htmlFor={item.item}>{capitalizeFirst(item.item)}</label>
                                </div>
                            )
                        })
                    }
                </fieldset>

                <fieldset className="stack-sm">
                    <legend>Equipment</legend>
                    {equipmentList.length > 0 &&
                        equipmentList.map((item, index) => {
                            return (
                                <div key={index}>
                                    <input type="checkbox" id={item.item} value={item.item} {...register("equipment")} name="equipment" />
                                    <label htmlFor={item.item}>{capitalizeFirst(item.item)}</label>
                                </div>
                            )
                        })
                    }
                </fieldset>

                <fieldset className="stack-sm">
                    <legend>Props</legend>
                    {propsList.length > 0 &&
                        propsList.map((item, index) => {
                            return (
                                <div key={index}>
                                    <input type="checkbox" id={item.item} value={item.item} {...register("props")} name="props" />
                                    <label htmlFor={item.item}>{capitalizeFirst(item.item)}</label>
                                </div>
                            )
                        })
                    }
                </fieldset>
                <button className="btn-primary" type="submit">Filter Blocks</button>
            </form>
        </>
    )
}

export default BlockFilters;