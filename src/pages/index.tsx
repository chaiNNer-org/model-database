import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getWriter } from 'src/lib/edit-mode';
import { Model, ModelId } from 'src/lib/schema';
import { getAllModelIds, getModelData } from 'src/lib/static-data';
import styles from '../styles/Home.module.scss';

interface Props {
    modelIds: ModelId[];
    modelData: Record<ModelId, Model>;
    other: string;
}

export default function Page({ modelIds, modelData, other }: Props) {
    return (
        <>
            <Head>
                <title>OpenModelDB</title>
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
            <main className={styles.main}>
                <div>
                    <p>{modelIds.length} models</p>
                    <button
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onClick={async () => {
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            const writer = (await getWriter())!;
                            await writer.updateModels([{ id: '8x-MS-Unpainter' as ModelId }]);
                        }}
                    >
                        Click me!
                    </button>
                    <br />
                    <pre>{other}</pre>
                    <pre>
                        {modelIds.map((id) => (
                            <span key={id}>
                                <Link href={'/models/' + id}>{id}</Link> - {modelData[id].license ?? 'no license'}
                                {'\n'}
                            </span>
                        ))}
                    </pre>
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps<Props> = async (_context) => {
    const modelIds = await getAllModelIds();
    const modelData = await getModelData(modelIds);
    return {
        props: {
            modelIds: modelIds,
            modelData: Object.fromEntries(modelIds.map((id, i) => [id, modelData[i]])),
            other: [...new Set(modelData.map((m) => m.license))].join('\n') + '\n\n',
        },
    };
};
