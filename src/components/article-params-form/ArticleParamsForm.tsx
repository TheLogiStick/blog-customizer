import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import { useEffect, useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onChange: (newArticleParams: ArticleStateType) => void;
	defaultArticleState: ArticleStateType;
};

export const ArticleParamsForm = ({
	onChange,
	defaultArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const articleRef = useRef<HTMLDivElement>(null);
	const arrowBtnRef = useRef<HTMLDivElement>(null);

	const handleOutsideClick = (event: MouseEvent) => {
		if (
			isOpen &&
			articleRef.current?.contains(event.target as Node) !== true &&
			arrowBtnRef.current?.contains(event.target as Node) !== true
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleOutsideClick);
		} else {
			document.removeEventListener('mousedown', handleOutsideClick);
		}

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen]);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onChange({
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		});
	};

	const handleReset = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);

		onChange({
			...defaultArticleState,
		});
	};

	return (
		<>
			<ArrowButton
				ref={arrowBtnRef}
				isOpen={isOpen}
				onClick={() => setIsOpen((prev) => !prev)}
			/>
			<aside
				ref={articleRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<div className={styles.upContainer}>
						<Text as='h2' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select
							title={'Шрифт'}
							selected={fontFamily}
							options={fontFamilyOptions}
							onChange={(newFontFamily) => setFontFamily(newFontFamily)}
						/>
						<RadioGroup
							name={'Размер шрифта'}
							title={'Размер шрифта'}
							options={fontSizeOptions}
							selected={fontSize}
							onChange={(newFontSize) => setFontSize(newFontSize)}
						/>
						<Select
							title={'Цвет шрифта'}
							selected={fontColor}
							options={fontColors}
							onChange={(newFontColor) => setFontColor(newFontColor)}
						/>
						<Separator />
						<Select
							title='Цвет фона'
							selected={backgroundColor}
							options={backgroundColors}
							onChange={(newBackgroundColor) =>
								setBackgroundColor(newBackgroundColor)
							}
						/>
						<Select
							title='Ширина контента'
							selected={contentWidth}
							options={contentWidthArr}
							onChange={(newContentWidth) => setContentWidth(newContentWidth)}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
