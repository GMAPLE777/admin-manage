<template>
  <div class="user-manage">
    <!-- 搜索 + 新增 -->
    <div class="toolbar">
      <CommonSearch placeholder="搜索用户名 / 手机号" @search="handleSearch" />
      <el-button type="primary" @click="handleAdd">新增用户</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="tableData" border stripe style="margin-top: 16px" v-loading="loading">
      <el-table-column prop="id" label="ID" width="80" align="center" />
      <el-table-column prop="username" label="用户名" min-width="120" />
      <el-table-column prop="phone" label="手机号" width="140" />
      <el-table-column prop="packageName" label="关联套餐" min-width="140" />
      <el-table-column prop="createTime" label="创建时间" width="140" align="center" />
      <el-table-column prop="status" label="状态" width="80" align="center">
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'warning'" size="small">
            {{ row.status === 1 ? '启用' : '禁用' }}
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
      <el-form ref="formRef" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="关联套餐" prop="packageName">
          <el-select v-model="form.packageName" placeholder="请选择套餐" style="width: 100%">
            <el-option label="5G畅享套餐" value="5G畅享套餐" />
            <el-option label="4G基础套餐" value="4G基础套餐" />
            <el-option label="5G尊享套餐" value="5G尊享套餐" />
            <el-option label="校园套餐" value="校园套餐" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0" active-text="启用" inactive-text="禁用" />
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
import { getUserList, addUser, updateUser, deleteUser, type UserInfo } from '@/api'

const loading = ref(false)
const tableData = ref<UserInfo[]>([])
const total = ref(0)
const keyword = ref('')
const pageInfo = reactive({ page: 1, pageSize: 10 })

// ===== 新增/编辑弹窗 =====
const dialogVisible = ref(false)
const submitLoading = ref(false)
const isEdit = ref(false)
const editId = ref<number | null>(null)
const formRef = ref<FormInstance>()

const dialogTitle = ref('新增用户')
const form = reactive({
  username: '',
  phone: '',
  packageName: '',
  status: 1,
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  packageName: [{ required: true, message: '请选择套餐', trigger: 'change' }],
}

// ===== 数据请求 =====
async function fetchData() {
  loading.value = true
  try {
    const result = await getUserList({ ...pageInfo, keyword: keyword.value })
    tableData.value = result.list
    total.value = result.total
  } catch { /* mock 未启用 */ } finally { loading.value = false }
}

function handleSearch(kw: string) {
  keyword.value = kw
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
  dialogTitle.value = '新增用户'
  resetForm()
  dialogVisible.value = true
}

function handleEdit(row: UserInfo) {
  isEdit.value = true
  editId.value = row.id
  dialogTitle.value = '编辑用户'
  form.username = row.username
  form.phone = row.phone
  form.packageName = row.packageName
  form.status = row.status
  dialogVisible.value = true
}

async function handleSubmit() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  submitLoading.value = true
  try {
    if (isEdit.value) {
      await updateUser({ id: editId.value!, ...form })
      ElMessage.success('编辑成功')
    } else {
      await addUser(form)
      ElMessage.success('新增成功')
    }
    dialogVisible.value = false
    fetchData()
  } catch { /* mock 未启用 */ } finally { submitLoading.value = false }
}

async function handleDelete(row: UserInfo) {
  try {
    await ElMessageBox.confirm(`确认删除用户「${row.username}」？`, '提示', { type: 'warning' })
    await deleteUser(row.id)
    ElMessage.success('删除成功')
    fetchData()
  } catch { /* 取消 */ }
}

function resetForm() {
  form.username = ''
  form.phone = ''
  form.packageName = ''
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
}
</style>
