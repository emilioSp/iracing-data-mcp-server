/// <reference types="node" resolution-mode="require"/>
import { AsyncLocalStorage } from 'node:async_hooks';
interface StorageContext {
    authCookie: string;
}
export declare const storage: AsyncLocalStorage<StorageContext>;
export {};
