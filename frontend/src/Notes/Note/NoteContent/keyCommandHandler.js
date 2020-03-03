import { RichUtils } from 'draft-js'
import keyCommandInsertNewLine from 'draft-js/lib/keyCommandInsertNewline'

const keyCommandHandler = (command, editorState) => {
	switch (command) {
		case 'split-block': {
			const blockType = editorState.getCurrentContent()
				.getBlockForKey(editorState.getSelection().getStartKey()).getType()
			if (blockType.startsWith('header-')) {
				const subState1 = keyCommandInsertNewLine(editorState)
				return RichUtils.toggleBlockType(subState1, blockType)
			}
			return null
		}
		case 'highlight':
			return RichUtils.toggleInlineStyle(editorState, 'HIGHLIGH')
		case 'line-under':
			return RichUtils.toggleInlineStyle(editorState, 'UNDERLINE')
		case 'line-through':
			return RichUtils.toggleInlineStyle(editorState, 'THROUGHLINE')
		case 'header-one':
			return RichUtils.toggleBlockType(editorState, 'header-one')
		case 'header-two':
			return RichUtils.toggleBlockType(editorState, 'header-two')
		case 'unordered-list':
			return RichUtils.toggleBlockType(editorState, 'unordered-list-item')
		case 'ordered-list':
			return RichUtils.toggleBlockType(editorState, 'ordered-list-item')
		default:
			return RichUtils.handleKeyCommand(editorState, command)
	}
}

export default keyCommandHandler
