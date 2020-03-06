import React from 'react'
import EditorButton from './EditorButton'

const inlineButtons = [
	{ label: 'bold', command: 'BOLD', shortcut: 'ctr + c', style: { fontWeight: 'bold' } },
	{ label: 'italic', command: 'ITALIC', shortcut: 'ctr + i', style: { fontStyle: 'italic' } },
	{ label: 'highlight', command: 'HIGHLIGH', shortcut: 'ctr + h',
		style: { backgroundColor: 'yellow' } },
	{ label: 'underline', command: 'UNDERLINE', shortcut: 'ctr + u',
		style: { textDecoration: 'underline' } },
	{ label: 'strikethrough', command: 'THROUGHLINE', shortcut: 'ctr + shift + u',
		style: { textDecoration: 'line-through' } },
]

const blockButtons = [
	{ label: 'header', command: 'header-one', shortcut: 'ctr + shift + 1' },
	{ label: 'subheader', command: 'header-two', shortcut: 'ctr + shift + 2' },
	{ label: 'list', command: 'unordered-list-item', shortcut: 'tab' },
	{ label: 'ordered list', command: 'ordered-list-item', shortcut: 'shift + tab' },
]

const operationButtons = [
	{ label: 'undo', command: 'undo', shortcut: 'ctr + z' },
	{ label: 'redo', command: 'redo', shortcut: 'ctr + shift + z' },
]

const ButtonGroup = ({ data, action, className, active = new Set() }) => (
	<div className={className || ''}>
		{data.map(d =>
			<EditorButton
				style={d.style}
				shortcut={d.shortcut}
				key={d.label}
				action={action}
				label={d.label}
				command={d.command}
				active={active.has(d.command)}
			/>)}
	</div>
)

const EditorControls = ({
	editorState,
	toggleInlineStyle,
	toggleBlockType,
	useEditorControl,
}) => {

	const blockType = new Set()
	blockType.add(
		editorState
			.getCurrentContent()
			.getBlockForKey(editorState.getSelection().getStartKey())
			.getType(),
	)

	const currentStyle = editorState.getCurrentInlineStyle()

	return (
		<div className='Editor-controls'>
			<ButtonGroup
				className={'operationButtons'}
				data={operationButtons}
				action={useEditorControl}
			/>
			<ButtonGroup
				className={'blockStyleButton'}
				active={blockType}
				data={blockButtons}
				action={toggleBlockType}
			/>
			<ButtonGroup
				className={'inlineStyleButtons'}
				active={currentStyle}
				data={inlineButtons}
				action={toggleInlineStyle}
			/>
		</div>
	)
}

export default EditorControls
