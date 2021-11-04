import React, { useCallback, useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';

import './styles.css';

interface Props {
    active: number;
    totalResults: number;
    sizePage: number;
    changePage: any;
}

const Paginator = (props: Props) => {
    const [items, setItems] = useState<any>([]);

    const changePage = useCallback(
        (number: number) => {
            props.changePage(number);
        },
        [props]
    );

    const generatePages = useCallback(
        () => {
            let items = [];

            let totalPages: number;

            if (props.totalResults <= props.sizePage) {
                totalPages = 1;
            } else if (props.totalResults % props.sizePage === 0) {
                totalPages = props.totalResults / props.sizePage;
                items.push(<Pagination.First key={0} onClick={() => changePage(1)} />);
            } else {
                totalPages = Math.ceil(props.totalResults / props.sizePage);
                items.push(<Pagination.First key={0} onClick={() => changePage(1)} />);
            }

            if (totalPages > 5) {
                if (props.active === 1 || props.active === 2) {
                    for (let i = 1; i <= 5; i++) {
                        items.push(
                            <Pagination.Item
                                key={i}
                                active={props.active === i}
                                onClick={() => changePage(i)}
                                className="hover-item"
                            >{i}</Pagination.Item>
                        );
                    }
                } else if (props.active === totalPages ||
                    props.active === (totalPages - 1)) {
                    for (let i = totalPages - 5; i <= totalPages; i++) {
                        items.push(
                            <Pagination.Item
                                key={i}
                                active={props.active === i}
                                onClick={() => changePage(i)}
                                className="hover-item"
                            >{i}</Pagination.Item>
                        );
                    }
                } else {
                    for (let i = props.active - 2; i <= props.active + 2; i++) {
                        items.push(
                            <Pagination.Item
                                key={i}
                                active={props.active === i}
                                onClick={() => changePage(i)}
                                className="hover-item"
                            >{i}</Pagination.Item>
                        );
                    }
                }
            } else {
                for (let i = 1; i <= totalPages; i++) {
                    items.push(
                        <Pagination.Item
                            key={i}
                            active={props.active === i}
                            onClick={() => changePage(i)}
                            className="hover-item"
                        >{i}</Pagination.Item>
                    );
                }
            }

            if (props.totalResults >= props.sizePage) {
                if (props.totalResults % props.sizePage === 0) {
                    items.push(<Pagination.Last key={totalPages + 1} onClick={() => changePage(totalPages)} />);
                } else {
                    items.push(<Pagination.Last key={totalPages + 1} onClick={() => changePage(totalPages)} />);
                }
            }

            setItems(items);
        },
        [changePage, props.active, props.sizePage, props.totalResults],
    );
    
    useEffect(() => {
        generatePages();
    }, [generatePages]);

    return (
        <div className="paginator-container">
                <div>
                    <p>Resultados totales: {props.totalResults}</p>
                </div>

                <div className="center">
                    <Pagination>
                        {items}
                    </Pagination>
                </div>
            </div>
    );
}

export default Paginator;