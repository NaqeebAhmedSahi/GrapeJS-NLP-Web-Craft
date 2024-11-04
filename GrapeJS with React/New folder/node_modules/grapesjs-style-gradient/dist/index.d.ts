import { Plugin } from 'grapesjs';

export interface GradientStop {
	color: string;
	position: string;
}
export interface GradientParseResult {
	direction: string;
	type: string;
	content: string;
	colors: string;
	stops: GradientStop[];
}
/**
 * Parse CSS gradient value.
 */
export declare const parseGradient: (value: string) => GradientParseResult;
/**
 * Get CSS gradient value.
 */
export declare const toGradient: (type: string, angle: string, color: string) => string;
export declare const getValidDir: (value: string) => string;
export declare const GRAD_DIRS: string[];
export declare const GRAD_TYPES: string[];
export type PluginOptions = {
	/**
	 * Grapick options.
	 * https://github.com/artf/grapick#configurations
	 * @default {}
	 */
	grapickOpts?: Record<string, any>;
	/**
	 * Custom color picker, check Grapick's repo to get more about it.
	 * If you leave it empty the native color picker will be used.
	 * You can use 'default' string to get the one used
	 * by Grapesjs (which is spectrum at the moment of writing).
	 */
	colorPicker?: "default" | ((handler: any) => void);
	/**
	 * Select, by default, the edge color stops of the gradient picker.
	 * @default true
	 */
	selectEdgeStops?: boolean;
	/**
	 * The id to assign for the gradient picker type.
	 * @default 'gradient'
	 */
	styleType?: string;
	/**
	 * Built-in property name to use for the composite type with the gradient
	 * picker and direction/type selectors.
	 * @default 'background-image'
	 */
	builtInType?: string | false;
};
declare const plugin: Plugin<PluginOptions>;

export {
	plugin as default,
};

export {};
