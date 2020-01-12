/**
 * @file 文章数据状态 / ES module
 * @module store/article
 * @author GuoGuang <https://github.com/GuoGuang>
 */

import Vue from 'vue'
import { isBrowser } from '~/environment/esm'
import { fetchDelay } from '~/utils/fetch-delay'
import { isArticleDetailRoute } from '~/utils/route'
// import onResponse from '~/plugins/axios'
import { scrollTo, Easing } from '~/utils/scroll-to-anywhere'

const getDefaultListData = () => {
  return {
    records: [],
    pagination: {}
  }
}

export const state = () => {
  return {
    list: {
      fetching: false,
      data: getDefaultListData()
    },
    hotList: {
      fetching: false,
      data: []
    },
    detail: {
      fetching: false,
      data: {}
    }
  }
}

export const mutations = {

  // 文章列表
  updateListFetchig(state, action) {
    state.list.fetching = action
  },
  updateListData(state, action) {
    state.list.data = action
  },
  updateExistingListData(state, action) {
    state.list.data.data.push(...action.data)
    state.list.data.pagination = action.pagination
  },

  // 热门文章
  updateHotListFetchig(state, action) {
    console.log('热门文章')
    state.hotList.fetching = action
  },
  updateHotListData(state, action) {
    state.hotList.data = action.data.records
  },

  // 文章详情
  updateDetailFetchig(state, action) {
    state.detail.fetching = action
  },
  updateDetailData(state, action) {
    state.detail.data = action
  },

  // 更新文章阅读全文状态
  updateDetailRenderedState(state, action) {
    Vue.set(
      state.detail.data,
      'isRenderedFullContent',
      action == null ? true : action
    )
  },

  // 喜欢某篇文章
  updateLikesIncrement(state) {
    const article = state.detail.data
    article && article.meta.likes++
  }
}

export const actions = {

  // 获取文章列表
  fetchList({ commit }, params = {}) {
    console.error('文章')
    const isRestart = !params.page || params.page === 1
    const isLoadMore = params.page && params.page > 1

    // 清空已有数据
    isRestart && commit('updateListData', getDefaultListData())
    commit('updateListFetchig', true)

    return this.$axios.$get(`/api/article`, { params })
      .then(response => {
        commit('updateListFetchig', false)
        isLoadMore ? commit('updateExistingListData', response.data) : commit('updateListData', response.data)
        if (isLoadMore && isBrowser) {
          Vue.nextTick(() => {
            scrollTo(
              window.scrollY + (window.innerHeight * 0.8),
              300,
              { easing: Easing['ease-in'] }
            )
          })
        }
      })
      .catch(error => {
        console.error(error)
        commit('updateListFetchig', false)
      }

      )
  },

  // 获取最热文章列表
  fetchHotList({ commit, rootState }) {
    const { SortType } = rootState.global.constants
    commit('updateHotListFetchig', true)
    return this.$axios.$get(`/api/article`, { params: { cache: 1, sort: SortType.Hot }})
      .then(response => {
        commit('updateHotListData', response)
        commit('updateHotListFetchig', false)
      })
      .catch(error => {
        console.error(error)
        commit('updateHotListFetchig', false)
      })
  },

  // 获取文章详情
  fetchDetail({ commit }, params = {}) {
    const delay = fetchDelay(
      (isBrowser && isArticleDetailRoute(window.$nuxt.$route.name)) ? null : 0
    )
    if (isBrowser) {
      Vue.nextTick(() => {
        scrollTo(0, 300, { easing: Easing['ease-in'] })
      })
    }
    commit('updateDetailFetchig', true)
    commit('updateDetailData', {})
    return this.$axios.$get(`/api/article/${params.article_id}`)
      .then(response => {
        return new Promise(resolve => {
          delay(() => {
            commit('updateDetailData', response.data)
            commit('updateDetailFetchig', false)
            resolve(response)
          })
        })
      })
      .catch(error => {
        commit('updateDetailFetchig', false)
        return Promise.reject(error)
      })
  },

  // 喜欢文章
  likeArticle({ commit }, article_id) {
    return this.$axios.$put(`/api/article/like/${article_id}`)
      .then(response => {
        commit('updateLikesIncrement')
        localStorage.setItem('article_' + article_id, '1')
        return Promise.resolve(response)
      })
  },
  unLikeArticle({ commit }, article_id) {
    return this.$axios.$delete(`/api/article/like/${article_id}`)
      .then(response => {
        localStorage.removeItem('article_' + article_id)
        commit('updateLikesIncrement')
        return Promise.resolve(response)
      })
  }
}
