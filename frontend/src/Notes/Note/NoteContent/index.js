import React, { useRef, useEffect } from 'react'
import { Editor, EditorState, getDefaultKeyBinding, RichUtils, KeyBindingUtil } from 'draft-js'
import keyCommandHandler from './keyCommandHandler'
import './NoteContent.css'
import 'draft-js/dist/Draft.css'
import EditorControls from './EditorControls'

const NoteContent = ({ editorState, setEditorState, setEditmode, saveNote }) => {

	const ref = useRef(null)
	const focusEditor = () => ref.current.focus()
	const onChange = (editorState) => {
		setEditorState(editorState)
	}

	useEffect(() => {
		focusEditor()
	}, [])

	const handleKeyCommand = (command, editorState) => {
		if (command === 'save-note') {
			saveNote()
			return 'handled'
		}

		const newState = keyCommandHandler(command, editorState)

		if (newState) {
			onChange(newState)
			return 'handled'
		}

		return 'not-handled'
	}

	const keyBindingFn = (event) => {
		setEditmode(true)

		switch (event.keyCode) {
			case 49:
				if (KeyBindingUtil.hasCommandModifier(event) && event.shiftKey) {
					return 'header-one'
				}
				return getDefaultKeyBinding(event)
			case 50:
				if (KeyBindingUtil.hasCommandModifier(event) && event.shiftKey) {
					return 'header-two'
				}
				return getDefaultKeyBinding(event)
			case 72:
				if (KeyBindingUtil.hasCommandModifier(event)) {
					return 'highlight'
				}
				return getDefaultKeyBinding(event)
			case 83:
				if (KeyBindingUtil.hasCommandModifier(event)) {
					return 'save-note'
				}
				return getDefaultKeyBinding(event)
			case 85:
				if (KeyBindingUtil.hasCommandModifier(event)) {
					return event.shiftKey ? 'line-through': 'line-under'
				}
				return getDefaultKeyBinding(event)
			case 9:
				return event.shiftKey ? 'ordered-list': 'unordered-list'
			default:
				return getDefaultKeyBinding(event)
		}
	}

	const customStyleMap = {
		'THROUGHLINE': {
			textDecoration: 'line-through',
		},
		'HIGHLIGH': {
			backgroundColor: 'yellow',
		},
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
					customStyleMap,
				}}/>
			</div>
		</div>
	)
}

export default NoteContent
