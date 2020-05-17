import * as t from 'ostseee-web-common/dist/modules/es2017/index';
export const testGet =()=>{
    return t.formsGet({
        transform:(val: any)=>{
            console.log(val);
            return {Forms:val};
        },
        update: {
        Forms: (prev, next) => {
          // Discard previous `response` value (we don't need it anymore).
          return next;
        },
      },});
}