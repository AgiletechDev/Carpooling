import { types } from '../types/types'

export const openDetallesModal = () => ({
  type: types.uiOpenModalDetalles
})

export const closeDetallesModal = () => ({
  type: types.uiCloseModalDetalles
})

export const openEditarModal = () => ({
  type: types.uiOpenModalEditar
})

export const closeEditarModal = () => ({
  type: types.uiCloseModalEditar
})

export const openSolicitudesModal = () => ({
  type: types.uiOpenModalSolicitudes
})

export const closeSolicitudesModal = () => ({
  type: types.uiCloseModalSolicitudes
})
