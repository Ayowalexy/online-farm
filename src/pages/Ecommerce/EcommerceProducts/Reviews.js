import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Input, Button, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import images from "assets/images";

//redux
import { useDispatch, useSelector } from "react-redux";

//spinner
import { Spinner } from 'reactstrap';

import moment from "moment";

//action
import {
  onLikeComment,
  onLikeReply,

  postReview,
  getAllReviews,
  postReviewFailure
} from "../../../store/actions";

//images
import Empty from "assets/images/empty_.png"


const CommentBox = ({
  value,
  onChange,
  comment,
  onCancelReply,
  isCommentAdd,
  onCancelComment,
  onAdd,
}) => {

  const dispatch = useDispatch();

  const { isReviewLoading, error } = useSelector(state => ({
    isReviewLoading: state.ecommerce.isReviewLoading,
    error: state.ecommerce.error
  }))

  useEffect(() => {
    if(typeof error === 'string' && Boolean(error)){
      setTimeout(() => {
        dispatch(postReview(""));
      }, 3000)
    }
  }, [error])


  return (
    <div className="w-100">
      {typeof error === 'string' && Boolean(error) && <Alert color="danger">{error}</Alert>}
      <div className="w-100 py-3">
        <Input
          type="textarea"
          name="text"
          id="exampleText"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </div>
      <div className="w-100">
        {isCommentAdd ? (
          <div className="text-end">
            <Button color="primary" onClick={onAdd}>

              {
                isReviewLoading
                  ?
                  <>
                    <Spinner size="sm">
                      Loading...
                    </Spinner>
                    <span>
                      {' '}Loading
                    </span>
                  </>
                  :
                  "Add Comment"
              }
            </Button>
            <Button
              color="secondary"
              className="float-end ms-2"
              onClick={() => {
                onCancelComment();
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className="text-end">
            <Button color="primary" onClick={onAdd}>
              Add
            </Button>
            <Button
              color="secondary"
              className="float-end ms-2"
              onClick={() => {
                onCancelReply(comment.commentId);
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

CommentBox.propTypes = {
  onCancelReply: PropTypes.func,
  value: PropTypes.any,
  onChange: PropTypes.func,
  comment: PropTypes.any,
  onCancelReply: PropTypes.func,
  isCommentAdd: PropTypes.any,
  onCancelComment: PropTypes.func,
  onAdd: PropTypes.func,
};



const ReplyItem = ({ reply, replyIdx, comment, onLikeUnlikeReply }) => {
  const user = reply["user"];

  return (
    <div className="d-flex mt-4" key={"_media_" + replyIdx}>
      {user.profile ? (
        <img
          src={images[user.profile]}
          className="avatar-xs me-3 rounded-circle"
          alt="img"
        />
      ) : (
        <div className="avatar-xs me-3">
          <span className="avatar-title bg-primary bg-soft text-primary rounded-circle font-size-16">
            N
          </span>
        </div>
      )}

      <div className="flex-grow-1">
        <h5 className="mt-0 mb-1 font-size-15">{user.name}</h5>
        <p className="text-muted">{reply.comment}</p>
        <ul className="list-inline float-sm-end mb-sm-0">
          <li className="list-inline-item">
            <Link
              to="#"
              onClick={() =>
                onLikeUnlikeReply(comment.commentId, reply.replyId)
              }
            >
              {reply.hasLiked ? (
                <>
                  <i className="fa fa-thumbs-up me-1" /> Like
                </>
              ) : (
                <>
                  <i className="far fa-thumbs-up me-1" /> Like
                </>
              )}
            </Link>
          </li>
        </ul>
        <div className="text-muted font-size-12">
          <i className="far fa-calendar-alt text-primary me-1" /> {reply.time}
        </div>
      </div>
    </div>
  );
};


ReplyItem.propTypes = {
  reply: PropTypes.any,
  replyIdx: PropTypes.any,
  comment: PropTypes.any,
  onLikeUnlikeReply: PropTypes.func
};
const CommentItem = ({
  comment,
  onLikeUnlikeComment,
  onClickReply,
  onCancelReply,
  index,
  onLikeUnlikeReply,
  onAddReply,
}) => {
  const user = comment["user"];

  const [replyText, setReplyText] = useState("");

  const onChangeReplyText = value => {
    setReplyText(value);
  };

  const onAddReplyToComment = () => {
    onAddReply(comment.commentId, replyText);
    setReplyText("");
  };

  return (
    <div
      className={
        comment.index + 1 === 1 ? "d-flex py-3 border-bottom" : "d-flex py-3 border-bottom"
      }
      key={"__media__" + index}
    >
      {comment.user.photo ? (
        <img
          src={comment.user.photo}
          className="avatar-xs me-3 rounded-circle"
          alt="img"
        />
      ) : (
        <div className="avatar-xs me-3">
          <span className="avatar-title bg-primary bg-soft text-primary rounded-circle font-size-16">
            N
          </span>
        </div>
      )}
      <div className="flex-grow-1">
        <h5 className="mt-0 mb-1 font-size-15">{'Annonymous'}</h5>
        <p className="text-muted">{comment?.review}</p>

        <div className="text-muted font-size-12">
          <i className="far fa-calendar-alt text-primary me-1" />
          {moment(comment.createdAt).format('ll')}
        </div>

        {/* add comment box */}
        {comment.showAddComment && (
          <CommentBox
            comment={comment}
            onCancelReply={onCancelReply}
            isCommentAdd={false}
            value={replyText}
            onChange={onChangeReplyText}
            onAdd={onAddReplyToComment}
          />
        )}

        {comment.replies
          ? (comment.replies || []).map((child, key) => {
            return (
              <ReplyItem
                reply={child}
                comment={comment}
                replyIdx={key}
                key={key}
                onLikeUnlikeReply={onLikeUnlikeReply}
              />
            );
          })
          : null}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.any,
  onLikeUnlikeComment: PropTypes.func,
  onClickReply: PropTypes.func,
  onCancelReply: PropTypes.func,
  index: PropTypes.any,
  onLikeUnlikeReply: PropTypes.func,
  onAddReply: PropTypes.func,
};

const Reviews = ({
  comments,
  productId,
  onClickReply,
  onCancelReply,
  onAddReply,
  onAddComment,
  reviews
}) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const onChangeCommentText = value => {
    setCommentText(value);
  };

  const onLikeUnlikeComment = commentId => {
    dispatch(onLikeComment(commentId, productId));
  };

  const onLikeUnlikeReply = (commentId, replyId) => {
    dispatch(onLikeReply(commentId, productId, replyId));
  };

  const [isCommentAdd, setIsCommentAdd] = useState(false);
  const onClickAddComment = () => {
    setIsCommentAdd(true);
  };
  const onCancelComment = () => {
    setIsCommentAdd(false);
  };

  const onAddProductComment = () => {
    onAddComment(commentText);
    setCommentText("");
    handleAddReview();
  };

  const handleAddReview = () => {

    const data = {
      review: commentText,
      rating: 3,
      productId: productId
    }

    Promise.resolve(() => {
    }).then(() => {
      dispatch(postReview({ data: data }));
    }).then(() => {
      dispatch(getAllReviews(({UserID: productId})))
    })

  }

  return (
    <div className="mt-5">
      <h5 className="mb-4">Reviews :</h5>

      {
        Boolean(reviews.length)
          ?
          (
            <>
              {(reviews || []).map((review, k) => {
                return (
                  <CommentItem
                    comment={review}
                    onLikeUnlikeComment={onLikeUnlikeComment}
                    onClickReply={onClickReply}
                    onCancelReply={onCancelReply}
                    onLikeUnlikeReply={onLikeUnlikeReply}
                    index={k}
                    key={k}
                    onAddReply={onAddReply}
                  />
                );
              })}

            </>
          )
          :
          (
            <div className="d-flex justify-content-center align-item-center w-100 flex-column">
              <img src={Empty} height={100} width={100} />
              <p>No reviews</p>
            </div>
          )

      }
      {isCommentAdd ? (
        <CommentBox
          isCommentAdd={true}
          onCancelComment={onCancelComment}
          value={commentText}
          onChange={onChangeCommentText}
          onAdd={onAddProductComment}
        />
      ) : (
        <div className="w-100 text-end pt-3">
          <Button color="primary" onClick={onClickAddComment}>
            Add Comment
          </Button>
        </div>
      )}
    </div>
  );
};


Reviews.propTypes = {
  comments: PropTypes.array,
  reply: PropTypes.any,
  productId: PropTypes.any,
  onClickReply: PropTypes.func,
  onCancelReply: PropTypes.func,
  onAddReply: PropTypes.func,
  onAddComment: PropTypes.func,
  reviews: PropTypes.array,
};

export default Reviews;