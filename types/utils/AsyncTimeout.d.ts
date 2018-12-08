/**
 * 通常のタイムアウト
 * @param millisec
 * @param func
 */
export declare function astimeout(millisec: number, func?: () => Promise<void>): Promise<void>;
/**
 * 実行してから待つ
 * @param millisec
 * @param func
 */
export declare function aswait(millisec: number, func?: () => Promise<void>): Promise<void>;
