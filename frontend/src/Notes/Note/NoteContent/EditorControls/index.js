import React from 'react'
import EditorButton from './EditorButton'

const inlineButtons = [
	{ label: 'bold', command: 'BOLD' },
]

const blockButtons = [
	{ label: 'H1', command: 'header-two' },
]

const operationButtons = [
	{ label: 'undo', command: 'undo' },
	{ label: 'redo', command: 'redo' },
]

const ButtonGroup = ({ data, action, className, active = new Set() }) => (
	<div className={className || ''}>
		{data.map(d =>
			<EditorButton
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
		<div>
			<ButtonGroup
				active={blockType}
				data={blockButtons}
				action={toggleBlockType}
			/>
			<ButtonGroup
				active={currentStyle}
				data={inlineButtons}
				action={toggleInlineStyle}
			/>
			<ButtonGroup
				data={operationButtons}
				action={useEditorControl}
			/>
		</div>
	)
}

export default EditorControls
