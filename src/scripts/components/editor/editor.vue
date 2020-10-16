<template>
  <div class="mdc-editor-container">
    <slot name="toolbar"></slot>
    <div ref="editor" class="mdc-editor"></div>
    <template v-if="customImageHandler">
      <input ref="file" type="file" hidden @change="onFileChange" />
    </template>
  </div>
</template>

<script>
import QuillEditor from './quill';
import Emotion from './emoji/emotion';
import getType from '../../utils/typeof';

// Define editor constants
const UI_EDITOR = {
  EVENT: {
    TEXT_CHANGE: 'change',
    FILE_CHANGE: 'file-change'
  },
  BLANK: '<p><br></p>',
  toolbarOptions: [
    [{ font: [] }, { size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ header: [] }, 'blockquote', 'code-block'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    [{ direction: 'rtl' }, { align: [] }],
    ['link', 'image', 'video'], // NOTE: 'formula' - requires `KaTex`
    ['clean']
  ]
};

export default {
  name: 'UiEditor',
  model: {
    prop: 'model',
    event: UI_EDITOR.EVENT.TEXT_CHANGE
  },
  props: {
    // States
    model: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    },
    // UI attributes
    toolbar: {
      type: [Array, String, null],
      default: null
    },
    placeholder: {
      type: [String, null],
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'snow'
    },
    // Extension attributes
    customImageHandler: {
      type: Boolean,
      default: false
    },
    toolbarCustomHandlers: {
      type: Object,
      default() {
        return {};
      }
    },
    emotions: {
      type: Array,
      default() {
        return []; // format: [{ type, title, content: { name, value, src } }]
      }
    },
    extension: {
      type: [Boolean, Object],
      default: false
    }
  },
  data() {
    return {
      Editor: {},
      $editor: null,
      htmlContent: ''
    };
  },
  watch: {
    model(val) {
      if (this.$editor) {
        if (val) {
          if (this.htmlContent !== val) {
            this.setHTML(val);
            this.$editor.blur();
          }
        } else {
          this.setHTML('');
        }
      }
    }
  },
  mounted() {
    this.Editor = require('./extension').default; // NOTE: For SSR

    this.$nextTick(() => {
      this.$editor = new QuillEditor(this.$refs.editor, {
        options: this.getOptions(),
        emotions: this.emotions,
        extension: this.extension
      });

      if (this.model) {
        this.setHTML(this.model);
      }

      this.$editor.on('text-change', (delta, oldDelta, source) => {
        let html = this.getHTML();
        if (html === UI_EDITOR.BLANK) {
          html = '';
        }

        this.htmlContent = html;
        this.$emit(UI_EDITOR.EVENT.TEXT_CHANGE, html);
      });
    });
  },
  beforeDestroy() {
    QuillEditor.destroy();
  },
  methods: {
    getOptions() {
      const defaultOptions = {
        modules: {},
        placeholder: this.placeholder,
        readOnly: this.readonly,
        theme: this.theme
      };
      let options = Object.assign(defaultOptions, this.options);

      options.modules.toolbar =
        this.toolbar === 'full' ? UI_EDITOR.toolbarOptions : this.toolbar;

      if (
        this.customImageHandler ||
        getType(this.toolbarCustomHandlers) === 'object'
      ) {
        let customHandlers = this.customImageHandler
          ? {
              image: () => {
                this.$refs.file.click();
              }
            }
          : {};

        Object.keys(this.toolbarCustomHandlers).forEach((customFormat) => {
          customHandlers[customFormat] = (formatValue) => {
            if (formatValue) {
              const insert = (value = 'null') => {
                QuillEditor.insert(customFormat, value);
              };

              this.toolbarCustomHandlers[customFormat](this.$editor, insert);
            } else {
              this.$editor.format(customFormat, false);
            }
          };
        });

        options.modules.toolbar = {
          container: options.modules.toolbar,
          handlers: customHandlers
        };
      }

      return options;
    },
    getHTML() {
      return this.$editor.root.innerHTML;
    },
    setHTML(html) {
      this.$editor.root.innerHTML = html;
    },
    encodeEmoji(html) {
      return Emotion.encode(html); // output: content
    },
    decodeEmoji(content) {
      let html = content;

      try {
        html = Emotion.decode(content); // output: html
      } catch (e) {
        console.warn(
          '[UiEditor] - `decodeEmoji`:',
          'The content must be an async data'
        );
      }

      return html;
    },
    onFileChange(event) {
      const file = event.target.files[0];
      const insert = (url) => {
        QuillEditor.insert('image', url);
      };

      this.$emit(UI_EDITOR.EVENT.FILE_CHANGE, file, insert);
      event.target.value = '';
    }
  }
};
</script>