import "styled-components";

// and extend them!
declare module "styled-components" {
	export interface DefaultTheme {
		blueColor: string;
		greyColor: string;
		yellowColor: string;
		greenColor: string;
	}
}
