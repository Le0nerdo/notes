import { RichUtils } from 'draft-js'

const keyCommandHandler = (command, editorState) => {
	switch (command) {
		case 'tab':
			return RichUtils.toggleBlockType(editorState, 'unordered-list-item')
		default:
			return RichUtils.handleKeyCommand(editorState, command)
	}
}

export default keyCommandHandler
