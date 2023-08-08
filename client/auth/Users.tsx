"use client";

import { dehydrate, useQueryClient } from "@tanstack/react-query";
import { Fragment, useEffect, useRef } from "react";
import { trpc } from "~/client/trpcClient";
import { useIsIntersecting } from "~/client/useIsIntersecting";

function useRenderCount() {
    const ref = useRef(0);
    useEffect(() => {
        ref.current++;
    });
    return ref.current;
}

export function Users() {
    const [isLoadMoreVisible, ref] = useIsIntersecting<HTMLDivElement>();

    const queryClient = useQueryClient();
    console.log(
        `hydrated client (render #${useRenderCount()})`,
        dehydrate(queryClient)
    );
    const query = trpc.user.list.useInfiniteQuery(
        {},
        {
            getNextPageParam(lastPage) {
                return lastPage.nextCursor;
            },
            refetchOnMount: false,
            staleTime: Infinity,
        }
    );

    const fetchNextPageRef = useRef(query.fetchNextPage);
    fetchNextPageRef.current = query.fetchNextPage;

    useEffect(() => {
        if (isLoadMoreVisible && query.hasNextPage && !query.isFetching) {
            fetchNextPageRef.current();
        }
    }, [isLoadMoreVisible, query.hasNextPage, query.isFetching]);

    return (
        <ul role="list" className="divide-y divide-gray-200">
            <h1>Users</h1>
            {query.data?.pages.map((page, index) => (
                <Fragment key={index}>
                    {page.items.map((user) => (
                        <>{user.email}</>
                    ))}
                </Fragment>
            ))}
            <h1>End Of Users</h1>
        </ul>
    );
}
