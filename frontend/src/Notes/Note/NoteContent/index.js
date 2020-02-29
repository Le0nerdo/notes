import React, { useRef, useEffect } from 'react'
import { Editor, EditorState, getDefaultKeyBinding, RichUtils } from 'draft-js'
import keyCommandHandler from './keyCommandHandler'
import './NoteContent.css'
import 'draft-js/dist/Draft.css'
import EditorControls from './EditorControls'

const NoteContent = ({ editorState, setEditorState, setEditmode }) => {

	const ref = useRef(null)
	const focusEditor = () => ref.current.focus()
	const onChange = (editorState) => {
		setEditorState(editorState)
	}

	useEffect(() => {
		focusEditor()
	}, [])

	const handleKeyCommand = (command, editorState) => {
		const newState = keyCommandHandler(command, editorState)

		if (newState) {
			onChange(newState)
			return 'handled'
		}

		return 'not-handled'
	}

	const keyBindingFn = (event) => {
		switch (event.keyCode) {
			case 9:
				return 'tab'
			default:
				return getDefaultKeyBinding(event)
		}
	}

	const toggleInlineStyle = (inlineStyle) => {
		onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle))
	}

	const toggleBlockType = (blockType) => {
		onChange(RichUtils.toggleBlockType(editorState, blockType))
	}

	const useEditorControl = (command) => {
		onChange(EditorState[command](editorState))
	}

	return (
		<div className='Editor-container'>
			<EditorControls {...{
				editorState,
				toggleInlineStyle,
				toggleBlockType,
				useEditorControl,
			}} />
			<div onClick={focusEditor}>
				<Editor {...{
					editorState,
					handleKeyCommand,
					onChange,
					ref,
					keyBindingFn,
				}}/>
			</div>
		</div>
	)
}

export default NoteContent
