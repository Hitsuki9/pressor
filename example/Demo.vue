<script setup lang="ts">
import type { UploadFileInfo } from 'naive-ui';
import { ref, reactive } from 'vue';
import { NUpload, NButton, NSlider } from 'naive-ui';
import { compress } from '../src';

const fileList = ref<UploadFileInfo[]>([]);
const handleChange = (evt: {
  file: UploadFileInfo;
  fileList: UploadFileInfo[];
}) => {
  if (evt.fileList.length > 1) {
    fileList.value = [evt.file];
  } else {
    fileList.value = evt.fileList;
  }
};

const processing = ref(false);
const info = reactive<{ time?: number; size?: number }>({});
const product = ref(null);
const handleCompress = async () => {
  const [fileInfo] = fileList.value;
  if (fileInfo.file) {
    try {
      processing.value = true;
      const start = Date.now();
      const res = await compress(fileInfo.file);
      const end = Date.now();
      info.time = end - start;
      info.size = res.size;
    } finally {
      processing.value = false;
    }
  }
};
</script>

<template>
  <h1>Pressor</h1>
  <div>
    <div>
      <n-upload
        accept="image/*"
        :default-upload="false"
        :file-list="fileList"
        @change="handleChange"
        @remove="fileList = []"
      >
        <n-button>Select Image</n-button>
      </n-upload>
      <div>
        <div>
          Target Size:
          <n-slider :min="0.1" :max="1" />
        </div>
        <div>
          Accuracy:
          <n-slider :min="0.1" :max="1" :step="0.1" />
        </div>
        <n-button type="primary" :loading="processing" @click="handleCompress">
          Compress!
        </n-button>
      </div>
    </div>
    <div>
      <span>Time: {{ info.time }}</span>
      <span>Size: {{ info.size }}</span>
      <n-button type="primary">Download</n-button>
    </div>
  </div>
</template>

<style scoped></style>
