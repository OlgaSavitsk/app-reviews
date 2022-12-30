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
  GetFile,
  GetFileSuccess,
  SaveReview,
  SaveReviewSuccess,
  SetFile,
  SetFileSuccess,
  UpdateReviewSuccess,
} from '../actions/review.actions';
import { initialUserState } from '../state/user.state';

export const userReduser = createReducer(
  initialUserState,
  on(FetchUser, (state) => ({
    ...state,
  })),
  on(FetchUserSuccess, (state, { user }) => ({
    ...state,
    user,
    isFetched: true,
  })),
  on(FetchUserFailed, (state, { error }) => ({
    ...state,
    isFetched: true,
    error,
  })),
  on(GetUsers, (state) => ({
    ...state,
    loading: true,
  })),
  on(GetUsersSuccess, (state, { users }) => {
    return {
      ...state,
      users,
      loading: false,
    };
  }),
  on(GetUsersFailed, (state, { error }) => ({
    ...state,
    isFetched: true,
    loading: false,
    error,
  })),
  on(UpdateUser, (state) => ({
    ...state,
  })),
  on(UpdateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((oldUser) =>
      oldUser.id === user.id ? user : oldUser,
    ),
  })),
  on(UpdateUserFailed, (state, { error }) => ({
    ...state,
    isFetched: true,
    loading: false,
    error,
  })),
  on(DeleteUser, (state) => ({
    ...state,
  })),
  on(DeleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== id),
  })),
  on(SaveReview, (state) => ({
    ...state,
  })),
  on(SaveReviewSuccess, (state, { review, userId, file }) => ({
    ...state,
    users: state.users.map((user) => {
      console.log('1', review)
      if (user.id === userId) {
        review = {
          ...review,
          image: file
        }
        console.log('2', review)
        return Object.assign({}, user, {
          reviews: [...user.reviews, review],
        });
      }
      return user;
    }),
  })),
  on(UpdateReviewSuccess, (state, { review, reviewId }) => ({
    ...state,
    users: state.users.map((user) => {
      if (
        Object.values(user.reviews)
          .map((review) => review.id)
          .includes(reviewId)
      ) {
        return Object.assign({}, user, {
          reviews: [
            ...user.reviews.map((oldReview) =>
              oldReview.id === reviewId ? review : oldReview,
            ),
          ],
        });
      }
      return user;
    }),
  })),


  on(SetFile, (state) => ({
    ...state,
  })),

  on(SetFileSuccess, (state, { file, reviewId }) => ({
    ...state,
    users: state.users.map((user) => {
      if (
        Object.values(user.reviews)
          .map((review) => review.id)
          .includes(reviewId)
      ) {
        return Object.assign({}, user, {
          reviews: [
            ...user.reviews.map((review) =>
              review.id === reviewId
                ? { ...review, image: file }
                : review,
            ),
          ],
        });
      }
      return user;
    }),
  })),

  // on(GetFile, (state) => ({
  //   ...state,
  // })),

  // on(GetFileSuccess, (state, { filePath, reviewId }) => ({
  //   ...state,
  //   users: state.users.map((user) => {
  //     if (
  //       Object.values(user.reviews)
  //         .map((review) => review.id)
  //         .includes(reviewId)
  //     ) {
  //       return Object.assign({}, user, {
  //         reviews: [
  //           ...user.reviews.map((review) =>
  //             review.id === reviewId
  //               ? { ...review, fileUrl: filePath }
  //               : review,
  //           ),
  //         ],
  //       });
  //     }
  //     return user;
  //   }),
  // })),

  on(ClearData, (state) => ({
    ...state,
    user: null,
  })),
);
