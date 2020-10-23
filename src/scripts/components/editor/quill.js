import Emotion from './extensions/emoji/emotion';
import useEmoji from './extensions/emoji';
import useDefaultFormats from './formats';
import useDefaultModules from './modules';
import useDefaultExtensions from './extensions';

let Quill;
let editor;
let toolbarHandlers = {};
let prototypeInitialized = false;

function createEditor(
  editorEl,
  { toolbarIcons, toolbarOptions, options, emotions, extension }
) {
  Quill = require('quill');

  toolbarHandlers = options.modules.toolbar.handlers;

  let onMounted = useDefaultExtensions(prototypeInitialized);

  if (!prototypeInitialized) {
    useDefaultFormats(toolbarOptions);
    useDefaultModules(options, toolbarIcons);

    if (options.theme === 'snow') {
      useEmoji(emotions);
    }

    if (extension) {
      Quill.register(extension, true);
    }

    prototypeInitialized = true;
  }

  editor = new Quill(editorEl, options);

  editor.insert = (customFormat, value) => {
    const range = editor.getSelection();
    if (range) {
      editor.insertEmbed(range.index, customFormat, value);
    }
  };

  return onMounted(editor);
}

const useEditor = () => {
  return {
    Quill,
    editor,
    toolbarHandlers
  };
};

export { createEditor, useEditor, Emotion };
