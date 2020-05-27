import { photoInput } from './photo.hook';

import { PhotoClass } from '../classes/photo.class';

const photo = new PhotoClass();

export let hooks = {};
hooks[photo.modelName] = [photo.inputHook];
// photo: [photo.inputHook],
