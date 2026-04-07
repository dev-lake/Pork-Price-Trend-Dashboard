# 猪周期监控台（React + TypeScript + Vite + Tailwind + ECharts）

一个面向“猪周期”研究的纯前端监控项目骨架，内置 mock 数据，支持后续替换为官方真实数据源。

## 技术栈
- React 18 + TypeScript
- Vite 5
- TailwindCSS
- ECharts (`echarts-for-react`)

## 功能模块
- 顶部筛选：时间区间、频率、数据适配器
- KPI 卡片：猪肉/生猪/白条/能繁母猪
- 趋势图：价格、供给、移动平均
- 相关性分析：rolling correlation、lag correlation、scatter regression
- 企业对比表：牧原、温氏、神农、巨星农牧
- 政策时间轴
- 数据源说明
- 浅色/深色模式

## 目录结构

```text
src/
  adapters/
    baseAdapter.ts            # DataAdapter 接口（adapter模式）
    mockAdapter.ts            # 默认mock实现
    officialCnAdapter.ts      # 官方数据接入占位实现
    stockAdapter.ts           # 股票数据可替换适配器接口
  components/
    TopFilters.tsx
    KpiCards.tsx
    TrendChart.tsx
    CorrelationPanel.tsx
    CompanyTable.tsx
    PolicyTimeline.tsx
    DataSourceNotes.tsx
  data/
    mockData.ts
  hooks/
    useDashboardData.ts
  services/
    dataService.ts            # adapter注册和调度
  utils/
    analytics.ts              # returns/MA/rolling/lag/regression
  types/
    domain.ts
  App.tsx
  main.tsx
```

## 运行方式
```bash
npm install
npm run dev
```

## 真实数据接入方式

### 1) 官方数据（农业农村部 / 国家统计局 / 国家发改委）
在 `src/adapters/officialCnAdapter.ts` 中实现 `fetchDashboardData`：
1. 根据时间区间并行调用各机构开放接口（或公开数据文件）
2. 统一映射为 `DashboardData` 结构
3. 若不同源频率不同，先重采样再合并

### 2) 股票数据适配器替换
在 `src/adapters/stockAdapter.ts` 实现新的 `StockDataAdapter`，例如：
- 交易所公开数据
- 券商终端开放接口
- 自建网关

通过依赖注入或在 `dataService` 注册后切换 provider，避免写死单一第三方。

### 3) 注意事项
- 当前项目是纯前端，正式上线建议配合 BFF/缓存层规避跨域、频控、鉴权问题。
- 生产环境建议把映射逻辑和接口健康检查补齐，并增加数据版本号管理。
