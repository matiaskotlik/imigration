import short from 'short-uuid';

const translator = short();

export const validId = (id: string, rigorous = true) =>
  translator.validate(id, rigorous);

export const urlId = (id: string) => translator.fromUUID(id);

export const dbId = (id: string) => translator.toUUID(id);
