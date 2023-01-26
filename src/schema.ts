export type ModelId = string;
export type UserId = string;
export type SPDXLicenseId = string;
export type TagId = string;
export type MarkDownString = string;

export interface Model extends Partial<ExtraModelProperties> {
    name: string;
    author: UserId | UserId[];
    license: SPDXLicenseId;
    tags: TagId[];
    description: MarkDownString;
    /** The date the model was published. Format: yyyy-mm-dd */
    date: string;
    architecture: string;
    size: string[] | null;
    scale: number;
    inputChannels: number;
    outputChannels: number;
    resources: Resource[];
}
interface ExtraModelProperties {
    trainingIterations: number;
    trainingEpochs: number;
    trainingBatchSize: number | string;
    trainingHRSize: number;
    trainingOTF: boolean;
    dataset: MarkDownString;
    datasetSize: number;
    pretrainedModelG: ModelReference;
    pretrainedModelD: ModelReference;
}
/** A reference to a model. The model might be in the database or not. */
export type ModelReference = ModelId | { description: MarkDownString };

export type Resource = PthFile | OnnxFile;
interface SingleFile {
    size: number | null;
    sha256: string | null;
    urls: string[];
}
interface PthFile extends SingleFile {
    type: 'pth';
}
interface OnnxFile extends SingleFile {
    type: 'onnx';
}

export interface User {
    name: string;
}

export interface Tag {
    name: string;
    description: MarkDownString;
}
