import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';
import { PageContainer } from '../../elements/page';
import { Model, ModelId } from '../../lib/schema';
import { getAllModelIds, getModelData } from '../../lib/server/data';
import { asArray, joinClasses } from '../../lib/util';

interface Params extends ParsedUrlQuery {
    id: ModelId;
}
interface Props {
    modelId: ModelId;
    modelData: Model;
}

const renderTags = (tags: string[]) => (
    <div className="flex flex-row flex-wrap gap-2">
        {tags.map((tag) => {
            return (
                <span
                    className="inline-flex items-center rounded-full bg-fade-100 px-2.5 py-0.5 text-xs font-medium text-fade-800 dark:bg-fade-800 dark:text-fade-200"
                    key={tag}
                >
                    {tag}
                </span>
            );
        })}
    </div>
);

const getColorMode = (numberOfChannels: number) => {
    switch (numberOfChannels) {
        case 1:
            return 'grayscale';
        case 3:
            return 'rgb';
        case 4:
            return 'rgba';
        default:
            return numberOfChannels;
    }
};

export default function Page({ modelId, modelData }: Props) {
    const images = ['256', '512', '1024'].map((size) => {
        return `https://picsum.photos/${size}/256`;
    });
    const [imageIndex, setImageIndex] = React.useState(0);
    return (
        <>
            <Head>
                <title>{`${modelData.name} - OpenModelDB`}</title>
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
            <PageContainer>
                {/* Two columns */}
                <div className="grid h-full w-full grid-cols-3 gap-4 py-6">
                    {/* Left column */}
                    <div className="relative col-span-2 flex h-full flex-col gap-4">
                        <div className="relative rounded-lg">
                            <div className="flex h-96 w-full rounded-lg bg-fade-100 align-middle dark:bg-fade-800">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    alt="Model preview"
                                    className="m-auto h-full w-full object-scale-down"
                                    src={images[imageIndex]}
                                />
                            </div>
                            <div className="space-between flex w-full py-2">
                                <button
                                    className="inline-flex cursor-pointer items-center rounded-lg border-0 bg-fade-200 px-5 py-2.5 text-center text-sm text-fade-900 transition duration-100 ease-in-out hover:bg-fade-300 focus:outline-none focus:ring-4 focus:ring-fade-700 dark:bg-fade-700 dark:text-white dark:hover:bg-fade-600 dark:focus:ring-fade-500"
                                    onClick={() => {
                                        setImageIndex((imageIndex + images.length - 1) % images.length);
                                    }}
                                >
                                    <BsCaretLeftFill />
                                </button>
                                <div className="flex grow items-center justify-center justify-items-center gap-2 align-middle">
                                    {images.map((image, index) => (
                                        <button
                                            className={joinClasses(
                                                'line-height-1 h-4 w-4 cursor-pointer rounded-full border-0 text-center transition duration-100 ease-in-out',
                                                index === imageIndex
                                                    ? 'bg-accent-500'
                                                    : 'bg-fade-200 hover:bg-fade-300 dark:bg-fade-700 dark:hover:bg-fade-600'
                                            )}
                                            key={image}
                                            onClick={() => {
                                                setImageIndex(index);
                                            }}
                                        />
                                    ))}
                                </div>
                                <button
                                    className="inline-flex cursor-pointer items-center rounded-lg border-0 bg-fade-200 px-5 py-2.5 text-center text-sm text-fade-900 transition duration-100 ease-in-out hover:bg-fade-300 focus:outline-none focus:ring-4 focus:ring-fade-700 dark:bg-fade-700 dark:text-white dark:hover:bg-fade-600 dark:focus:ring-fade-500"
                                    onClick={() => {
                                        setImageIndex((imageIndex + 1) % images.length);
                                    }}
                                >
                                    <BsCaretRightFill />
                                </button>
                            </div>
                        </div>
                        <div className="relative">
                            <div>
                                <h1 className="m-0">{modelData.name}</h1>
                                <p className="m-0">
                                    by{' '}
                                    <strong className="m-0 text-lg text-accent-600 dark:text-accent-500">
                                        {asArray(modelData.author).map((userId) => (
                                            <React.Fragment key={userId}>
                                                <Link href={`/users/${userId}`}>{userId}</Link>
                                            </React.Fragment>
                                        ))}
                                    </strong>
                                </p>
                            </div>
                            <div>
                                <p className="whitespace-pre-line">{modelData.description}</p>
                            </div>
                        </div>
                    </div>
                    {/* Right column */}
                    <div className="col-span-1 w-full">
                        {/* Download Button */}
                        <div className="mb-2">
                            {modelData.resources.map((resource) => {
                                return resource.urls.map((url) => {
                                    const isExternal = !url.includes('oracle');
                                    let host = 'unknown';
                                    if (url.includes('github')) {
                                        host = 'GitHub';
                                    } else if (url.includes('drive.google')) {
                                        host = 'Google Drive';
                                    } else if (url.includes('mega.nz')) {
                                        host = 'Mega';
                                    }

                                    return (
                                        <div key={resource.sha256}>
                                            <button
                                                className="mr-2 mb-2 inline-flex w-full cursor-pointer items-center rounded-lg border-0 border-accent-700 bg-accent-500 px-5 py-2.5 text-center text-lg font-medium text-white transition duration-100 ease-in-out hover:bg-accent-600 focus:outline-none focus:ring-4 focus:ring-accent-700 dark:focus:ring-accent-500"
                                                type="button"
                                                onClick={() => window.open(url, '_blank')}
                                            >
                                                <div className="w-full">
                                                    {isExternal ? (
                                                        <FiExternalLink
                                                            className="mr-2 h-4 w-4"
                                                            viewBox="0 0 22 22"
                                                        />
                                                    ) : (
                                                        <svg
                                                            className="mr-2 h-4 w-4 fill-current"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                                                        </svg>
                                                    )}
                                                    Download{' '}
                                                    {resource.size
                                                        ? `(${(resource.size / 1024 / 1024).toFixed(1)} MB)`
                                                        : ''}
                                                </div>
                                            </button>
                                            <div className="w-full text-center">
                                                {isExternal ? `Hosted offsite by ${host}` : 'Hosted by OpenModelDB'}
                                            </div>
                                        </div>
                                    );
                                });
                            })}
                        </div>

                        <div className="relative table-auto overflow-hidden rounded-lg border-fade-700">
                            <table className="w-full border-collapse overflow-hidden rounded-lg border-fade-700 text-left text-sm text-gray-500 dark:text-gray-400 ">
                                <tbody className="overflow-hidden  rounded-lg ">
                                    <tr className=" ">
                                        <th
                                            className="whitespace-nowrap bg-fade-100 px-6 py-4 font-medium text-gray-900 dark:bg-fade-800 dark:text-white"
                                            scope="row"
                                        >
                                            Architecture
                                        </th>
                                        <td className="px-6 py-4">{modelData.architecture}</td>
                                    </tr>
                                    <tr className="">
                                        <th
                                            className="whitespace-nowrap bg-fade-100 px-6 py-4 font-medium text-fade-900 dark:bg-fade-800 dark:text-white"
                                            scope="row"
                                        >
                                            Scale
                                        </th>
                                        <td className="px-6 py-4 ">{modelData.scale}</td>
                                    </tr>
                                    {modelData.size && (
                                        <tr className="">
                                            <th
                                                className="whitespace-nowrap bg-fade-100 px-6 py-4 font-medium text-fade-900 dark:bg-fade-800 dark:text-white"
                                                scope="row"
                                            >
                                                Size
                                            </th>
                                            <td className="px-6 py-4">{renderTags(modelData.size)}</td>
                                        </tr>
                                    )}
                                    <tr className="">
                                        <th
                                            className="whitespace-nowrap bg-fade-100 px-6 py-4 font-medium text-gray-900 dark:bg-fade-800 dark:text-white"
                                            scope="row"
                                        >
                                            Tags
                                        </th>
                                        <td className="px-6 py-4">{renderTags(modelData.tags)}</td>
                                    </tr>
                                    <tr className="">
                                        <th
                                            className="whitespace-nowrap bg-fade-100 px-6 py-4 font-medium text-gray-900 dark:bg-fade-800 dark:text-white"
                                            scope="row"
                                        >
                                            Color Mode
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-row flex-wrap gap-2 uppercase">
                                                {getColorMode(modelData.inputChannels)} →{' '}
                                                {getColorMode(modelData.outputChannels)}
                                            </div>
                                        </td>
                                    </tr>
                                    {Object.entries(modelData)
                                        .filter(
                                            ([key, _value]) =>
                                                ![
                                                    // Handled by other parts of page
                                                    'name',
                                                    'author',
                                                    'description',
                                                    'resources',
                                                    // Already handled manually
                                                    'architecture',
                                                    'scale',
                                                    'size',
                                                    'tags',
                                                    'inputChannels',
                                                    'outputChannels',
                                                    // This is just messed up in the data
                                                    'pretrainedModelG',
                                                ].includes(key)
                                        )
                                        .filter(([_key, value]) => !!value)
                                        .sort()
                                        .map(([key, value]) => {
                                            return (
                                                <tr
                                                    className=""
                                                    key={key}
                                                >
                                                    <th
                                                        className="whitespace-nowrap bg-fade-100 px-6 py-4 font-medium capitalize text-fade-900 dark:bg-fade-800 dark:text-white"
                                                        scope="row"
                                                    >
                                                        {key}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {Array.isArray(value)
                                                            ? renderTags(value.map((v) => String(v)))
                                                            : value}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </PageContainer>
        </>
    );
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const modelIds = await getAllModelIds();

    return {
        paths: modelIds.map((id) => ({ params: { id } })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
    const modelId = context.params?.id;
    if (!modelId) throw new Error("Missing path param 'id'");

    const modelData = await getModelData(modelId);

    return {
        props: { modelId, modelData },
    };
};
