import type { TObject } from '@cmtlyt/base';
import { apply, curry, map, pick, pipe, reduce, rename, zip } from '@cmtlyt/base/fp/utils';

function arrayToRenameObj(obj: string[]) {
  return reduce((pre, cur: string) => {
    const [on, nn = on] = cur.split(':');
    pre[on] = nn;
    return pre;
  }, {} as TObject<any>)(obj);
}

const getOriName = map((item: string) => item.split(':')[0]);

const pickFormRenameArray = pipe(getOriName, pick);

const mergeRenameObj = pipe(arrayToRenameObj, zip);

export const pickRename = curry((arr: string[], obj: TObject<any>): TObject<any> => {
  return pipe(pickFormRenameArray(arr), mergeRenameObj(arr), apply(rename))(obj);
});
