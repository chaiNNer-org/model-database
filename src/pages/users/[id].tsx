import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { Model, ModelId, User, UserId } from 'src/lib/schema';
import { getAllModelIds, getModelData, getUsers } from 'src/lib/server/data';

interface Params extends ParsedUrlQuery {
    id: UserId;
}
interface Props {
    userId: UserId;
    user: User;
    models: Record<ModelId, Model>;
}

export default function Page({ userId, user, models }: Props) {
    return (
        <>
            <Head>
                <title>{`${user.name} - OpenModelDB`}</title>
                <meta
                    content="Generated by create next app"
                    name="description"
                />
                <meta
                    content="width=device-width, initial-scale=1"
                    name="viewport"
                />
                <link
                    href="/favicon.ico"
                    rel="icon"
                />
            </Head>
            <main>
                <div>
                    <p>{userId}</p>
                    <p>{user.name}</p>
                    <br />
                    <p>Models:</p>
                    <pre>
                        {Object.keys(models).map((id) => (
                            <span key={id}>
                                <Link href={`/models/${id}`}>{id}</Link>
                                {'\n'}
                            </span>
                        ))}
                    </pre>
                </div>
            </main>
        </>
    );
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const users = await getUsers();

    return {
        paths: Object.keys(users).map((id) => ({ params: { id: id as UserId } })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
    const userId = context.params?.id;
    if (!userId) throw new Error("Missing path param 'id'");

    const users = await getUsers();
    const user = users[userId];

    const modelIds = await getAllModelIds();
    const allModels = await Promise.all(
        modelIds.map(async (id) => {
            return [id, await getModelData(id)] as const;
        })
    );

    return {
        props: {
            userId,
            user,
            models: Object.fromEntries(
                allModels.filter(([, model]) => {
                    return model.author === userId || (Array.isArray(model.author) && model.author.includes(userId));
                })
            ),
        },
    };
};
