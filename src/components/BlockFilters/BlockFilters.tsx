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

    type FilterValues = {
        type: string[],
        focus: string[],
        level: string[],
        equipment: string[],
        props: string[];
    };

    const { register, handleSubmit, reset } = useForm<FilterValues>();
    const [filtered, setFiltered] = useState<boolean>(false);


    const onSubmit = handleSubmit((data: any) => {
        let cleanData: any = {};

        Object.keys(data).forEach((key: any) => {
            if (data[key].length) {
                cleanData[key] = data[key];
            }
        });

        props.updateFilters(cleanData);
        setFiltered(true);
    });

    const resetForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        reset();
        props.updateFilters();
        setFiltered(false);
    }

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
                                    <input type="checkbox" id={item.item} value={item.item} {...register("type")} name="type" />
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
                                    <input type="checkbox" id={item.item} value={item.item} {...register("level")} name="level" />
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
                {filtered &&
                    <button className="btn-secondary" onClick={resetForm}>Clear Filters</button>
                }
            </form>
        </>
    )
}

export default BlockFilters;