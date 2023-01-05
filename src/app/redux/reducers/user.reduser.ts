import { createReducer, on } from '@ngrx/store';

import {
  ClearData,
  DeleteUser,
  DeleteUserSuccess,
  FetchUser,
  FetchUserFailed,
  FetchUserSuccess,
  GetUsers,
  GetUsersFailed,
  GetUsersSuccess,
  UpdateUser,
  UpdateUserFailed,
  UpdateUserSuccess,
} from '../actions/user.actions';
import {
  DeleteReview,
  DeleteReviewSuccess,
  SaveReview,
  SaveReviewSuccess,
  SetFile,
  SetFileSuccess,
  UpdateReviewSuccess,
} from '../actions/review.actions';
import { initialUserState, UserState } from '../state/user.state';

export const userReduser = createReducer<UserState>(
  initialUserState,
  on(
    FetchUser,
    (state): UserState => ({
      ...state,
    })
  ),
  on(
    FetchUserSuccess,
    (state, { user }): UserState => ({
      ...state,
      user,
      isFetched: true,
    })
  ),
  on(FetchUserFailed, (state, { error }) => ({
    ...state,
    isFetched: true,
    error,
  })),
  on(
    GetUsers,
    (state): UserState => ({
      ...state,
      loading: true,
    })
  ),
  on(
    GetUsersSuccess,
    (state, { users }): UserState => ({
      ...state,
      users,
      loading: false,
    })
  ),
  on(GetUsersFailed, (state, { error }) => ({
    ...state,
    isFetched: true,
    loading: false,
    error,
  })),
  on(
    UpdateUser,
    (state): UserState => ({
      ...state,
    })
  ),
  on(
    UpdateUserSuccess,
    (state, { user }): UserState => ({
      ...state,
      users: state.users.map((oldUser) => (oldUser.id === user.id ? user : oldUser)),
    })
  ),
  on(UpdateUserFailed, (state, { error }) => ({
    ...state,
    isFetched: true,
    loading: false,
    error,
  })),
  on(
    DeleteUser,
    (state): UserState => ({
      ...state,
    })
  ),
  on(
    DeleteUserSuccess,
    (state, { id }): UserState => ({
      ...state,
      users: state.users.filter((user) => user.id !== id),
    })
  ),

  on(
    SaveReview,
    (state): UserState => ({
      ...state,
    })
  ),
  on(
    SaveReviewSuccess,
    (state, { review, userId, file }): UserState => ({
      ...state,
      users: state.users.map((user) => {
        if (user.id === userId) {
          review = {
            ...review,
            userId,
          };
        }
        return { ...user, reviews: [...user.reviews, review] };
        // return user;
      }),
    })
  ),
  on(
    UpdateReviewSuccess,
    (state, { review, reviewId }): UserState => ({
      ...state,
      users: state.users.map((user) => {
        if (
          Object.values(user.reviews)
            .map((review) => review.id)
            .includes(reviewId)
        ) {
          return {
            ...user,
            reviews: [
              ...user.reviews.map((oldReview) => (oldReview.id === reviewId ? review : oldReview)),
            ],
          };
        }
        return user;
      }),
    })
  ),

  on(
    DeleteReview,
    (state): UserState => ({
      ...state,
    })
  ),
  on(
    DeleteReviewSuccess,
    (state, { id }): UserState => ({
      ...state,
      users: state.users.map((user) => {
        if (
          Object.values(user.reviews)
            .map((review) => review.id)
            .includes(id)
        ) {
          return { ...user, reviews: [...user.reviews.filter((review) => review.id !== id)] };
        }
        return user;
      }),
    })
  ),

  on(
    SetFile,
    (state): UserState => ({
      ...state,
    })
  ),

  on(
    SetFileSuccess,
    (state, { file, reviewId }): UserState => ({
      ...state,
      users: state.users.map((user) => {
        if (
          Object.values(user.reviews)
            .map((review) => review.id)
            .includes(reviewId)
        ) {
          return {
            ...user,
            reviews: [
              ...user.reviews.map((review) =>
                review.id === reviewId ? { ...review, image: file } : review
              ),
            ],
          };
        }
        return user;
      }),
    })
  ),

  on(
    ClearData,
    (state): UserState => ({
      ...state,
      user: null,
    })
  )
);

export const userReviewReduser = createReducer(initialUserState);
