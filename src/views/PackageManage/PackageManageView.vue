<template>
  <div class="package-manage">
    <!-- 搜索 + 分类筛选 + 新增 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <CommonSearch placeholder="搜索套餐名称" @search="handleSearch" />
        <el-select v-model="category" placeholder="套餐分类" clearable style="width: 160px" @change="handleCategoryChange">
          <el-option label="5G畅享套餐" value="5G畅享" />
          <el-option label="4G基础套餐" value="4G基础" />
          <el-option label="5G尊享套餐" value="5G尊享" />
          <el-option label="校园套餐" value="校园" />
        </el-select>
      </div>
      <el-button type="primary" @click="handleAdd">新增套餐</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="tableData" border stripe style="margin-top: 16px" v-loading="loading">
      <el-table-column prop="id" label="ID" width="80" align="center" />
      <el-table-column prop="packageName" label="套餐名称" min-width="140" />
      <el-table-column prop="price" label="价格（元）" width="120" align="center">
        <template #default="{ row }">
          <span style="color: #e6a23c; font-weight: bold">¥{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="flow" label="流量" width="120" align="center" />
      <el-table-column prop="callMinutes" label="通话（分钟）" width="130" align="center" />
      <el-table-column prop="status" label="状态" width="80" align="center">
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'warning'" size="small">
            {{ row.status === 1 ? '上架' : '下架' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" size="small" link @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" size="small" link @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <CommonPagination :total="total" :page="pageInfo.page" :pageSize="pageInfo.pageSize" @change="handlePageChange" />

    <!-- 新增/编辑弹窗 -->
    <CommonDialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :loading="submitLoading"
      @confirm="handleSubmit"
      @close="resetForm"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="110px">
        <el-form-item label="套餐名称" prop="packageName">
          <el-input v-model="form.packageName" placeholder="请输入套餐名称" />
        </el-form-item>
        <el-form-item label="价格（元）" prop="price">
          <el-input-number v-model="form.price" :min="0" :precision="0" style="width: 100%" placeholder="请输入价格" />
        </el-form-item>
        <el-form-item label="流量" prop="flow">
          <el-input v-model="form.flow" placeholder="如：100GB" />
        </el-form-item>
        <el-form-item label="通话分钟" prop="callMinutes">
          <el-input-number v-model="form.callMinutes" :min="0" :precision="0" style="width: 100%" placeholder="请输入通话分钟数" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0" active-text="上架" inactive-text="下架" />
        </el-form-item>
      </el-form>
    </CommonDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance } from 'element-plus'
import CommonSearch from '@/components/CommonSearch.vue'
import CommonPagination from '@/components/CommonPagination.vue'
import CommonDialog from '@/components/CommonDialog.vue'
import { getPackageList, addPackage, updatePackage, deletePackage, type PackageInfo } from '@/api'

const loading = ref(false)
const tableData = ref<PackageInfo[]>([])
const total = ref(0)
const keyword = ref('')
const category = ref('')
const pageInfo = reactive({ page: 1, pageSize: 10 })

// ===== 新增/编辑弹窗 =====
const dialogVisible = ref(false)
const submitLoading = ref(false)
const isEdit = ref(false)
const editId = ref<number | null>(null)
const formRef = ref<FormInstance>()

const dialogTitle = ref('新增套餐')
const form = reactive({
  packageName: '',
  price: 0,
  flow: '',
  callMinutes: 0,
  status: 1,
})

const rules = {
  packageName: [{ required: true, message: '请输入套餐名称', trigger: 'blur' }],
  price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
  flow: [{ required: true, message: '请输入流量', trigger: 'blur' }],
  callMinutes: [{ required: true, message: '请输入通话分钟数', trigger: 'blur' }],
}

// ===== 数据请求 =====
async function fetchData() {
  loading.value = true
  try {
    const result = await getPackageList({ ...pageInfo, keyword: keyword.value, category: category.value })
    tableData.value = result.list
    total.value = result.total
  } catch { /* mock 未启用 */ } finally { loading.value = false }
}

function handleSearch(kw: string) {
  keyword.value = kw
  pageInfo.page = 1
  fetchData()
}

function handleCategoryChange() {
  pageInfo.page = 1
  fetchData()
}

function handlePageChange({ page, pageSize }: { page: number; pageSize: number }) {
  pageInfo.page = page
  pageInfo.pageSize = pageSize
  fetchData()
}

// ===== CRUD =====
function handleAdd() {
  isEdit.value = false
  editId.value = null
  dialogTitle.value = '新增套餐'
  resetForm()
  dialogVisible.value = true
}

function handleEdit(row: PackageInfo) {
  isEdit.value = true
  editId.value = row.id
  dialogTitle.value = '编辑套餐'
  form.packageName = row.packageName
  form.price = row.price
  form.flow = row.flow
  form.callMinutes = row.callMinutes
  form.status = row.status
  dialogVisible.value = true
}

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  submitLoading.value = true
  try {
    if (isEdit.value) {
      await updatePackage({ id: editId.value!, ...form })
      ElMessage.success('编辑成功')
    } else {
      await addPackage(form)
      ElMessage.success('新增成功')
    }
    dialogVisible.value = false
    fetchData()
  } catch { /* mock 未启用 */ } finally { submitLoading.value = false }
}

async function handleDelete(row: PackageInfo) {
  try {
    await ElMessageBox.confirm(`确认删除套餐「${row.packageName}」？`, '提示', { type: 'warning' })
    await deletePackage(row.id)
    ElMessage.success('删除成功')
    fetchData()
  } catch { /* 取消 */ }
}

function resetForm() {
  form.packageName = ''
  form.price = 0
  form.flow = ''
  form.callMinutes = 0
  form.status = 1
  formRef.value?.resetFields()
}

onMounted(fetchData)
</script>

<style lang="scss" scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;

  &-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}
</style>
