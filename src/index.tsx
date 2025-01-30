import clsx from 'clsx';
import { CSSProperties, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { Article } from './components/article/Article';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import styles from './styles/index.module.scss';
import './styles/index.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleStyles, setArticleStyles] = useState({
		fontFamilyOption: defaultArticleState.fontFamilyOption,
		fontSizeOption: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	});

	const updateArticleStyles = (newArticleStyles: ArticleStateType) => {
		setArticleStyles((prevArticleStyles) => ({
			...prevArticleStyles,
			...newArticleStyles,
		}));
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleStyles.fontFamilyOption.value,
					'--font-size': articleStyles.fontSizeOption.value,
					'--font-color': articleStyles.fontColor.value,
					'--container-width': articleStyles.contentWidth.value,
					'--bg-color': articleStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onChange={updateArticleStyles}
				defaultArticleState={defaultArticleState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
